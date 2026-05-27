import React, { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ComplianceRule } from '../../types'
import FilterChipRow from '../common/FilterChipRow'
import SeverityBadge from '../common/SeverityBadge'
import SkeletonBlock from '../common/SkeletonBlock'

interface Props {
  rules: ComplianceRule[]
  isLoading: boolean
}

/**
 * ComplianceRulesReference — searchable, category-filtered compliance rules library.
 */
const ComplianceRulesReference: React.FC<Props> = ({ rules, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = useMemo<string[]>(() => {
    return ['all', ...Array.from(new Set(rules.map((r) => r.category)))]
  }, [rules])

  const categoryOptions = useMemo(
    () => categories.map((cat) => ({ value: cat, label: cat === 'all' ? 'All' : cat })),
    [categories]
  )

  const filtered = useMemo<ComplianceRule[]>(() => {
    const q = searchQuery.toLowerCase()
    return rules.filter((rule) => {
      const matchesCategory = activeCategory === 'all' || rule.category === activeCategory
      const matchesSearch =
        !q ||
        [rule.clause, rule.title, rule.description, rule.category].some((f) =>
          f.toLowerCase().includes(q)
        )
      return matchesCategory && matchesSearch
    })
  }, [rules, searchQuery, activeCategory])

  if (isLoading) {
    return (
      <Box className="flex flex-col gap-3">
        <SkeletonBlock height={40} />
        <Box className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBlock key={i} height={32} width={96} />
          ))}
        </Box>
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonBlock key={i} height={96} />
        ))}
      </Box>
    )
  }

  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search clauses, titles, descriptions..."
        aria-label="Search compliance rules"
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            fontSize: '13px',
            bgcolor: 'surface.raised',
            '& fieldset': { borderColor: 'border.default' },
            '&:hover fieldset': { borderColor: 'border.strong' },
            '&.Mui-focused fieldset': { borderColor: 'brand.primary' },
          },
          '& .MuiInputBase-input': { color: 'text.primary' },
          '& .MuiInputBase-input::placeholder': { color: 'text.disabled', opacity: 1 },
        }}
      />

      <Box sx={{ mb: 2 }}>
        <FilterChipRow
          options={categoryOptions}
          value={activeCategory}
          onChange={setActiveCategory}
          ariaLabel="Filter rules by category"
        />
      </Box>

      {filtered.length === 0 ? (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'textHierarchy.tertiary', fontSize: '13px' }}>
            No rules match &quot;{searchQuery}&quot;
          </Typography>
          <Button
            size="small"
            onClick={() => {
              setSearchQuery('')
              setActiveCategory('all')
            }}
            sx={{ mt: 1.5, textTransform: 'none', color: 'brand.primary', fontSize: '12px' }}
          >
            Clear filters
          </Button>
        </Box>
      ) : (
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {filtered.map((rule) => (
            <Box component="li" key={rule.id} sx={{ mb: 1 }}>
              <Paper
                variant="outlined"
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: 'background.paper',
                  borderColor: 'border.default',
                  borderRadius: 2,
                  transition: 'border-color 100ms, background-color 100ms',
                  '&:hover': { bgcolor: 'surface.raised', borderColor: 'border.strong' },
                }}
              >
                <Box className="mb-2 flex items-center justify-between">
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'brand.primary', fontSize: '12px' }}
                  >
                    {rule.clause}
                  </Typography>
                  <SeverityBadge severity={rule.importance} size="sm" />
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5, fontSize: '14px' }}>
                  {rule.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'textHierarchy.tertiary', mb: 1.5, fontSize: '13px', lineHeight: 1.5 }}>
                  {rule.description}
                </Typography>
                <Chip
                  label={rule.category}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '10px',
                    bgcolor: 'surface.raised',
                    color: 'textHierarchy.tertiary',
                    border: 1,
                    borderColor: 'border.subtle',
                  }}
                />
              </Paper>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default ComplianceRulesReference

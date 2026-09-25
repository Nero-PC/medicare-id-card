import { useMemo, useState, type ChangeEvent } from 'react'
import { CmsSeal } from './CmsSeal'
import { formatMedicareNumber } from './formatMedicareNumber'
import styles from './MedicareCard.module.css'

export type MedicareCardData = {
  fullName: string
  medicareNumber: string
  partAStart: string
  partBStart: string
  entitledPartA: boolean
  entitledPartB: boolean
}

export const DEFAULT_MEDICARE_CARD: MedicareCardData = {
  fullName: 'JOHN L SMITH',
  medicareNumber: '1EG4-TE5-MK72',
  partAStart: '03-01-2016',
  partBStart: '03-01-2016',
  entitledPartA: true,
  entitledPartB: true,
}

type Props = {
  /** Optional controlled values; omit to use internal defaults + live form. */
  value?: MedicareCardData
  onChange?: (next: MedicareCardData) => void
  /** Show the fillable form beside/below the card (default true). */
  showForm?: boolean
  className?: string
}

function displayOrPlaceholder(value: string, placeholder = '—') {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : placeholder
}

export function MedicareCard({
  value,
  onChange,
  showForm = true,
  className,
}: Props) {
  const [internal, setInternal] = useState<MedicareCardData>(DEFAULT_MEDICARE_CARD)
  const data = value ?? internal

  const setData = (patch: Partial<MedicareCardData>) => {
    const next = { ...data, ...patch }
    if (onChange) onChange(next)
    if (value === undefined) setInternal(next)
  }

  const onName = (e: ChangeEvent<HTMLInputElement>) =>
    setData({ fullName: e.target.value.toUpperCase() })

  const onMedicare = (e: ChangeEvent<HTMLInputElement>) =>
    setData({ medicareNumber: formatMedicareNumber(e.target.value) })

  const entitlementRows = useMemo(() => {
    const rows: { label: string; date: string }[] = []
    if (data.entitledPartA) {
      rows.push({
        label: 'HOSPITAL (PART A)',
        date: displayOrPlaceholder(data.partAStart),
      })
    }
    if (data.entitledPartB) {
      rows.push({
        label: 'MEDICAL (PART B)',
        date: displayOrPlaceholder(data.partBStart),
      })
    }
    return rows
  }, [data])

  return (
    <div className={[styles.layout, className].filter(Boolean).join(' ')}>
      <div className={styles.cardColumn}>
        <div className={styles.cardFrame}>
          <article className={styles.card} aria-label="Medicare Health Insurance sample card">
            <header className={styles.header}>
              <div className={styles.headerInner}>
                <CmsSeal className={styles.seal} />
                <h1 className={styles.title}>MEDICARE HEALTH INSURANCE</h1>
              </div>
              <svg
                className={styles.headerCurve}
                viewBox="0 0 1000 40"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0,0 L1000,0 L1000,12 Q500,52 0,12 Z" fill="currentColor" />
              </svg>
            </header>

            <div className={styles.body}>
              <div className={styles.watermark} aria-hidden="true">
                SAMPLE
              </div>

              <div className={styles.field}>
                <div className={styles.label}>Name/Nombre</div>
                <div className={styles.value}>{displayOrPlaceholder(data.fullName)}</div>
              </div>

              <div className={styles.field}>
                <div className={styles.label}>Medicare Number/Número de Medicare</div>
                <div className={styles.value}>
                  {displayOrPlaceholder(data.medicareNumber)}
                </div>
              </div>

              <div className={styles.split}>
                <div className={styles.splitCol}>
                  <div className={styles.label}>Entitled to/Con derecho a</div>
                  {entitlementRows.length === 0 ? (
                    <div className={styles.valueMuted}>—</div>
                  ) : (
                    entitlementRows.map((row) => (
                      <div key={row.label} className={styles.value}>
                        {row.label}
                      </div>
                    ))
                  )}
                </div>
                <div className={styles.splitCol}>
                  <div className={styles.label}>Coverage starts/Cobertura empieza</div>
                  {entitlementRows.length === 0 ? (
                    <div className={styles.valueMuted}>—</div>
                  ) : (
                    entitlementRows.map((row) => (
                      <div key={`date-${row.label}`} className={styles.value}>
                        {row.date}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <footer className={styles.footer} />
          </article>
        </div>
      </div>

      {showForm && (
        <form
          className={styles.form}
          onSubmit={(e) => e.preventDefault()}
          aria-label="Medicare card details"
        >
          <h2 className={styles.formHeading}>Fill in your Medicare card details</h2>

          <div className={styles.fieldGroup}>
            <label className={styles.inputBlock}>
              <span className={styles.inputLabel}>Full name</span>
              <input
                className={`${styles.input} ${styles.inputTop}`}
                value={data.fullName}
                onChange={onName}
                autoComplete="name"
                spellCheck={false}
              />
            </label>

            <label className={styles.inputBlock}>
              <span className={styles.inputLabel}>Medicare number</span>
              <input
                className={`${styles.input} ${styles.inputMiddle}`}
                value={data.medicareNumber}
                onChange={onMedicare}
                inputMode="text"
                autoComplete="off"
                spellCheck={false}
                maxLength={13}
              />
            </label>

            <div className={styles.dateRow}>
              <label className={styles.inputBlock}>
                <span className={styles.inputLabel}>Part A start date</span>
                <input
                  className={`${styles.input} ${styles.inputBottomLeft}`}
                  value={data.partAStart}
                  onChange={(e) => setData({ partAStart: e.target.value })}
                  placeholder="MM-DD-YYYY"
                  disabled={!data.entitledPartA}
                />
              </label>
              <label className={styles.inputBlock}>
                <span className={styles.inputLabel}>Part B start date</span>
                <input
                  className={`${styles.input} ${styles.inputBottomRight}`}
                  value={data.partBStart}
                  onChange={(e) => setData({ partBStart: e.target.value })}
                  placeholder="MM-DD-YYYY"
                  disabled={!data.entitledPartB}
                />
              </label>
            </div>
          </div>

          <div className={styles.toggles}>
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={data.entitledPartA}
                onChange={(e) => setData({ entitledPartA: e.target.checked })}
              />
              <span>Entitled to Hospital (Part A)</span>
            </label>
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={data.entitledPartB}
                onChange={(e) => setData({ entitledPartB: e.target.checked })}
              />
              <span>Entitled to Medical (Part B)</span>
            </label>
          </div>

          <p className={styles.hint}>
            SAMPLE card for demonstration only — not an official Medicare ID.
          </p>
        </form>
      )}
    </div>
  )
}

export default MedicareCard

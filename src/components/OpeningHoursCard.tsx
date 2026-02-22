import { Clock, AlertCircle } from 'lucide-react'

interface HourEntry {
  day: string
  closed: boolean
  openMorning?: string | null
  closeMorning?: string | null
  openEvening?: string | null
  closeEvening?: string | null
}

interface OpeningHoursCardProps {
  hours: HourEntry[]
  specialNotice?: string | null
}

const dayLabels: Record<string, string> = {
  lundi: 'Lundi',
  mardi: 'Mardi',
  mercredi: 'Mercredi',
  jeudi: 'Jeudi',
  vendredi: 'Vendredi',
  samedi: 'Samedi',
  dimanche: 'Dimanche',
}

const dayIndexMap: Record<string, number> = {
  dimanche: 0,
  lundi: 1,
  mardi: 2,
  mercredi: 3,
  jeudi: 4,
  vendredi: 5,
  samedi: 6,
}

export function OpeningHoursCard({ hours, specialNotice }: OpeningHoursCardProps) {
  const today = new Date().getDay()

  return (
    <div className="overflow-hidden rounded-2xl border border-border/40 bg-card shadow-lg">
      <div className="p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
            <Clock className="h-5 w-5" />
          </div>
          <h3 className="font-display text-xl font-semibold">Horaires d&apos;ouverture</h3>
        </div>
        <div className="space-y-0">
          {hours.map((entry, index) => {
            const isToday = dayIndexMap[entry.day] === today
            return (
              <div
                key={index}
                className={`flex items-center justify-between rounded-lg px-3 py-3 transition-colors ${
                  isToday ? 'bg-primary/6 font-semibold' : ''
                } ${
                  index < hours.length - 1 ? 'border-b border-border/20' : ''
                }`}
              >
                <span className={`text-sm ${
                  isToday ? 'text-primary font-semibold' : 'font-medium'
                }`}>
                  {dayLabels[entry.day] || entry.day}
                  {isToday && (
                    <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                </span>
                {entry.closed ? (
                  <span className="rounded-full bg-destructive/8 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-destructive">
                    Fermé
                  </span>
                ) : (
                  <div className="text-right text-sm text-muted-foreground tabular-nums">
                    {entry.openMorning && entry.closeMorning && (
                      <span>{entry.openMorning} – {entry.closeMorning}</span>
                    )}
                    {entry.openMorning && entry.openEvening && <span className="mx-1.5 text-border/50">·</span>}
                    {entry.openEvening && entry.closeEvening && (
                      <span>{entry.openEvening} – {entry.closeEvening}</span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {specialNotice && (
          <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-amber-50/50 border border-amber-200/30 p-4">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-[13px] leading-relaxed text-amber-900/70">{specialNotice}</p>
          </div>
        )}
      </div>
    </div>
  )
}

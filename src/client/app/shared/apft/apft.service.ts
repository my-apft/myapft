// import { Subject } from 'rxjs/Subject'
import { Inject, Injectable, InjectionToken } from '@angular/core'
import { Observable } from 'rxjs/Observable'

export interface IApftService {
  calculateEventScore(standard: ScoringStandard, event: ApftEvent, age: number, gender: Gender, raw: number): number
}

export const APFT_STANDARDS = new InjectionToken<ScoringStandards>('app.config.apft')

@Injectable()
export class ApftService {
  private scorecard$ = this.scorecards.take(1).shareReplay()

  constructor( @Inject(APFT_STANDARDS) private scorecards: Observable<ScoringStandards>) { }

  calculateAge(dob: Date, refDate: Date) {
    const ageDifMs = refDate.getTime() - dob.getTime()
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  calculateEventScore(standard: ScoringStandard, event: ApftEvent, age: number, gender: Gender, raw: number): number {
    return Object.keys(standard[event][gender]).map(key => {
      const split = key.split('-')
      const length = +split[1] - +split[0] + 1
      const res = Array.from(new Array(length), (x, i) => i + (+split[0]))
      return {
        range: res,
        scores: standard[event][gender][key]
      }
    })
      .filter(a => a.range.some(b => b === age))
      .map(a => {
        if (raw < 0) return 0
        if (raw >= a.scores.length) return 100
        return a.scores[raw]
      })
      .pop() || 0
  }

  calculate(apft: ApftTest) {
    const year = apft.date.getFullYear()

    return this.scorecard$.pluck(year.toString()).map((scorecard: ScoringStandard) => {
      const age = this.calculateAge(apft.dob, apft.date)
      const ticks = 90
      const baseSeconds = 1242
      const seconds = apft.runMin * 60 + apft.runSec
      const runRaw = Array.from(Array(ticks), (v: any, k: any) => baseSeconds - (k * 6))
        .findIndex((val, i, coll) => seconds >= val && seconds <= coll[i - 1])

      const pu = this.calculateEventScore(scorecard, 'pu', age, apft.gender, apft.pu)
      const su = this.calculateEventScore(scorecard, 'su', age, apft.gender, apft.su)
      const run = this.calculateEventScore(scorecard, 'run', age, apft.gender, runRaw <= 0 ? ticks : runRaw)

      const finalRun = { score: run, raw: `${apft.runMin}:${apft.runSec}`, pass: run >= 60, failed: run < 60 }
      const finalSu = { score: su, raw: apft.su, pass: su >= 60, failed: su < 60 }
      const finalPu = { score: pu, raw: apft.pu, pass: pu >= 60, failed: pu < 60 }

      const passed = finalPu.pass && finalSu.pass && finalRun.pass

      return {
        run: finalRun,
        pu: finalPu,
        su: finalSu,
        passed,
        failed: !passed,
        total: finalRun.score + finalSu.score + finalPu.score,
        resultText: passed ? 'Passed' : 'Failed'
      }
    })
  }
}

type Gender = 'male' | 'female'
type ApftEvent = 'pu' | 'su' | 'run'
interface ScoringStandards { [key: number]: ScoringStandard }

interface MaleFemale {
  male: { [key: string]: number[] },
  female: { [key: string]: number[] }
}

interface ScoringStandard {
  pu: MaleFemale
  su: MaleFemale
  run: MaleFemale
}

interface ApftTest {
  gender: Gender
  dob: Date
  date: Date
  runMin: number
  runSec: number
  su: number
  pu: number
}

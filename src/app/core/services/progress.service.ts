import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private static readonly MISSIONS_STORAGE_KEY = 'imx_completed_missions';

  private readonly completed = signal<ReadonlySet<string>>(this.loadStorageIds());

  readonly completedMissions = this.completed.asReadonly();

  isCompleted(missionId: string): boolean {
    return this.completed().has(missionId);
  }

  countCompleted(missionIds: string[]): number {
    const done = this.completed();
    return missionIds.filter((id) => done.has(id)).length;
  }

  complete(missionIds: string[]): void {
    const fresh = missionIds.filter((id) => !this.completed().has(id));
    if (fresh.length === 0) return;
    this.completed.update((done) => new Set([...done, ...fresh]));
    this.saveStorageIds();
  }

  reset(missionIds: string[]): void {
    const remove = new Set(missionIds);
    this.completed.update((done) => new Set([...done].filter((id) => !remove.has(id))));
    this.saveStorageIds();
  }

  private loadStorageIds(): ReadonlySet<string> {
    if (typeof window === 'undefined') return new Set();
    try {
      if (typeof window.localStorage !== 'undefined' && window.localStorage !== null) {
        const parsed: unknown = JSON.parse(
          window.localStorage.getItem(ProgressService.MISSIONS_STORAGE_KEY) ?? '[]',
        );
        if (Array.isArray(parsed)) {
          return new Set(parsed.filter((id): id is string => typeof id === 'string'));
        }
      }
    } catch {
      // Ignore security errors or corrupt saved data
    }
    return new Set();
  }

  private saveStorageIds(): void {
    if (typeof window === 'undefined') return;
    try {
      if (typeof window.localStorage !== 'undefined' && window.localStorage !== null) {
        window.localStorage.setItem(
          ProgressService.MISSIONS_STORAGE_KEY,
          JSON.stringify([...this.completed()]),
        );
      }
    } catch {
      // Ignore quota or security errors in test/sandbox
    }
  }
}

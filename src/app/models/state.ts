export interface State {
    code: number,
    name: string
}

const States = {
    TODO: { code: 0, name: 'TODO(未着手)' } as State,
    NOTYET: { code: 1, name: '着手中' } as State,
    COMPLETE: { code: 2, name: '完了' } as State
} as const;

export type States = typeof States[keyof typeof States];

export const AllStates = Object.values(States);

export interface EventPhotosUpdatedData {
    id: number;
}

export interface EventStateChanged {
    state: string;
    value: string;
}

export interface ServerEvent {
    event: 'photos_update' | 'state_changed',
    data: EventPhotosUpdatedData | EventStateChanged,
}

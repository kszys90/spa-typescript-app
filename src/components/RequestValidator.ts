export interface RequestValidator {
    url: string
    perPage: number
    page?: number
    filter?: string | null
}
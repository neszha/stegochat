export interface CreateForm {
    name: string
    expired: integer
    coverImage: File | null
}

export interface CreateResponse {
    data: {
        stegoImage: string,
        message: string
    }
}

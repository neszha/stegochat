import { type Request, type Response } from 'express'

export default {
    /**
     * Get Api Status.
     */
    getApiStatus (req: Request, res: Response): void {
        res.json({
            message: 'Api server is ready.'
        })
    }
}

import { NextFunction, Request, Response} from "express"

const asyncHandler = (func: (req: any, res: Response) => Promise<void>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await func(req, res)
    } catch (error) {
        next(error)
    }
}

export default asyncHandler
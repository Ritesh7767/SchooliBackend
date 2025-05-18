import zod from 'zod'

const scheduleValidation = zod.object({
    title: zod.string().min(1, "title cannot be empty"),
    start: zod.string()
})

export default scheduleValidation
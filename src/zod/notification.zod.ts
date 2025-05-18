import zod from 'zod'

const notificationValidation = zod.object({
    message: zod.string().min(8, "Notification cannot be smaller than 8 characters")
})

export default notificationValidation
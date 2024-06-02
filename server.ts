import dotenv from 'dotenv'
import app from './src/app'

dotenv.config()

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on port ${port}`))

const server = app
export default server

import { Hono } from 'hono'
import blogRoute from './Routes/blogRoutes'
import {sign} from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {signUpInput, signInInput} from '@omega-r-npm/medium-common'
import {cors} from 'hono/cors'

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string
    JWT_SECRET : string
  }
}>()

const corsOptions = {
  origin: "https://blog-it-ucq1.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
  
};

app.use(cors(corsOptions));


app.route("/api/v1/blog", blogRoute);

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const {email, password, name}   = await c.req.json();
  const {success} = signUpInput.safeParse({email, password, name});
  if(!success){
    return c.json({message : "Input are incorrect", success : false});
  }
  try {
    const user  = await prisma.user.create({
      data : {
        email , password , name
      }
    })

    const token = await sign({id : user.id} , c.env.JWT_SECRET)
    return c.json({message : "SignUp successful", token: token, success : true});
  } catch (error) {
    return c.json({message : "SignUp error", success : false});
  }
})

app.post('/api/v1/signin', async (c) => {
  const {email, password} = await c.req.json();
  const {success} = signInInput.safeParse({email, password})
  if(!success){
    return c.json({message : "Input are incorrect", success : false});
  }

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where : {email : email}
    });

    if(user){
  
      if(password === user.password){
        const token = await sign({id : user.id} , c.env.JWT_SECRET);
        return c.json({message : "Sign-In Successful", token : token, success : true});
      }
      return c.json({message : "Wrong Password", success : false});
    }
    return c.json({message : "User not Found", success : false});
    
  } catch (error) {
    return c.json({message : "Error", success : false});
  }
})


export default app

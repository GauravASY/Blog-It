import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { blogPost } from "@omega-r-npm/medium-common";

const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRoute.use("/*", async (c, next) => {
  let token = c.req.header("Authorization");
  if (!token) {
    return c.json({ message: "Unauthorized", success: false });
  }
  token = token?.split(" ")[1];
  try {
    const verifyUser =  await verify(token, c.env.JWT_SECRET);
    if (!verifyUser) {
      return c.json({ message: "Unauthorized", success: false });
    }
    c.set("userId", verifyUser.id as string);
    await next();
  } catch (error) {
    return c.json({ message: "Authorization failed", success: false });
  }
});

blogRoute.post("/", async (c) => {
  const body = await c.req.json();

  const {success} = blogPost.safeParse(body);
  if(!success){
    return c.json({message : "Wrong Inputs", success: false})
  }

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.create({
      data :{
        title : body.title,
        content : body.content,
        authorId : c.get("userId"),
      }
    })
    return c.json({id: blog.id, message : "Blog Posted", success : true});
  } catch (error) {
    return c.json({message : "Unauthorized to post", success : false});
  } 
});

blogRoute.put("/", async (c) => {
  const body = await c.req.json();

  const {success} = blogPost.safeParse(body);
  if(!success){
    return c.json({message : "Wrong Inputs", success: false})
  }

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.update({
      where: {id : body.id},
      data : {
        title : body.title,
        content : body.content,
      }
    })  

    return c.json({id: blog.id, message : "Blog Updated", success : true})
  } catch (error) {
    return c.json({message : "Updation failed", success : false})
  }
});

blogRoute.get("/bulk", async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  })

  try {
    const blogs = await prisma.post.findMany();
    return c.json({blogs : blogs, message : "Fetching Successfull", success : true});
  } catch (error) {
    return c.json({message : "Fetch error. Can't get list", success : false});
  }

})

blogRoute.get("/:id", async (c) => {
  const userId = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findUnique({
      where :{id: userId},
    })
    
    return c.json({blog : blog, message : "Fetch successful", success: true});
  } catch (error) {
    return c.json({message : "Error In fetching ", success : false})
  }
});



export default blogRoute;

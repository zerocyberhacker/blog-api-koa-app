// import { Validator, ValidationError } from 'jsonschema';
// import { RouterContext } from 'koa-router';
// const v = new Validator()

// export const validateArticle = async (ctx: RouterContext, next: any) => {
  
//     const validationOptions = {
//         throwError: true,
//         allowUnknownAttributes: false
//     }

//     const body = ctx.request.body;
//     try {
//         v.validate(body, article, validationOptions)
//         await next()
//     } catch (error) {
//         if (error instanceof ValidationError) {
//             ctx.body = error;
//             ctx.status = 400;
//         } else {
//             throw error;
//         }
//     }
// }
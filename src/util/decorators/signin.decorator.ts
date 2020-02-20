import { createParamDecorator, BadRequestException } from "@nestjs/common";

export const SignIn = createParamDecorator((data, req) => {
  const { email, password, username } = req.body;
  console.log(username);

  if (!email && !username)
    throw new BadRequestException("you haven't provided email or username");
  return email ? { email, password } : { username, password };
});

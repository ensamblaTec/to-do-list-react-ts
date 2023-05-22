import { Delete, Get, Post, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogInfo } from "@/utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

import { registerUser, logoutUser, loginUser } from "../domain/orm/User.orm";

@Route("/api/v1/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  @Post("/register")
  public async registerUser(user: IUser): Promise<any> {
    if (!user) {
      return { message: "failed" };
    }

    const response = await registerUser(user).then(() => {
      console.log('user has been register')
    });
    return response
  }

  @Post("/login")
  public async loginUser(auth: IAuth): Promise<any> {
    let response: any = { message: `Verify your credentials (email and password)` }
    if (!auth) {
      LogError(`[/api/v1/auth/login] Login needs valid credentials`)
      return response;
    }

    LogSuccess(`[/api/v1/auth/register] Login with user: ${auth.email}`)
    await loginUser(auth).then((reg) => {
      LogSuccess(`[/api/v1/auth/login]: Logged in user: ${auth.email}`)
      response = {
        message: `Successfully login with email: ${auth.email}`,
        token: reg.token
      }
    })

    return response
  }

  @Post("/logout")
  public async logoutUser(): Promise<any> {
    throw "";
  }
}

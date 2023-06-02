import { Delete, Get, Post, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogInfo } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";
import { AuthResponse, ErrorResponse } from "./types";
import { registerUser, logoutUser, loginUser, getUserByID } from "../domain/orm/User.orm";

@Route("/api/v1/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  @Post("/register")
  public async registerUser(user: IUser): Promise<any> {
    let response: any = { message: "failed creating an user" };
    if (!user) {
      return response;
    }

    await registerUser(user).then(() => {
      console.log("user has been register");
      response = {
        message: `User created successfully: ${user.name}`,
      };
    });
    return response;
  }

  @Post("/login")
  public async loginUser(auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse = {
      message: `Verify your credentials (email and password)`,
      error: "not valid",
    };
    if (!auth || !auth.email || !auth.password) {
      LogError(`[/api/v1/auth/login] Login needs valid credentials`);
      response = {
        error: `Error an occurred`,
        message: `Please provide an email && password to login`
      }
      return response;
    }

    LogSuccess(`[/api/v1/auth/register] Login with user: ${auth.email}`);
    let data = await loginUser(auth);
    if(!data) 
      return response;
    response = {
      message: `Successfully login with email: ${data.user.email}`,
      token: data.token,
    };

    return response;
  }

  @Post("/logout")
  public async logoutUser(): Promise<any> {
    throw "";
  }

  @Get('/me')
  public async userData(@Query() id: string): Promise<any> {
    let response: any = {}

    if(!id) {
      return response
    }

    LogSuccess(`[/api/users] Get user data by ID`);
    response = await getUserByID(id);
    delete response.password; // delete password to IUser response

    return response;
  }
}
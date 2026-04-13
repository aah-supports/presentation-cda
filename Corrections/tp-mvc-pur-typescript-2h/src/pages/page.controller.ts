import { Request, Response } from "express";

export class PageController {
  home = (_req: Request, res: Response): void => {
    res.status(200).json({
      page: "home",
      title: "TP MVC pur TypeScript (2h)",
      architecture: ["Router", "Controller", "Service", "Repository", "Middleware"]
    });
  };
}

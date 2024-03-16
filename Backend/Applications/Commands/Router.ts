import {
  Command,
  StaticCommandNames,
  StaticCommandErrorNames,
  CommandExecuteArguments,
} from "./Context.js";
import {
  Notification,
  NotificationTypes,
} from "../../Components/Notification/Notification.js";
import { createValidationService } from "../Validation/Validation.js";
import Client from "../../Components/Client/Client.js";
import { Logger } from "Applications/Logger/Logger.js";

class CommandRouter {
  private Command: Command;
  private Socket: any;
  private Client: any;
  private Data: any;
  private ValidationService: any;
  private Database: any;
  private CommandExecutionFunction: Function;
  private Logger: Logger;

  constructor(
    Command: Command,
    Socket: any,
    Client: Client,
    Data: any,
    DBRouter: any,
    Logger: Logger
  ) {
    this.Command = Command;
    this.Socket = Socket;
    this.Client = Client;
    this.Data = Data;
    this.ValidationService = createValidationService();
    this.Logger = Logger;
    this.CommandExecutionFunction = Command.getCommand();
    this.Database = DBRouter.getRoutedDatabaseConnection(
      Client.getAccessLevel().toString()
    );
  }

  async route() {
    const validateIncomingData = await this.validateIncomingData();
    console.log(validateIncomingData)

    if (!validateIncomingData.isValid) {
      this.Logger.error(
        `Invalid incoming data ${JSON.stringify(this.Data)} ${JSON.stringify(validateIncomingData.errors)}`
      )

      return this.sendErrorMessageToClient(
        StaticCommandErrorNames.INVALID_CLIENT_INCOMING_DATA
      );
    }

    this.Logger.info(JSON.stringify(this.Data));

    if (this.validateCommandUserAccessLevel()) {
      return this.sendErrorMessageToClient(
        StaticCommandErrorNames.UNAUTHORIZED
      );
    }

    const CommandData = await this.executeCommand();
    this.emitNotificationIfCommandRequires(CommandData);

    // if (!this.validateOutgoingData(CommandData)) {
    //   return this.sendErrorMessageToClient(StaticCommandErrorNames.INVALID_CLIENT_OUTGOING_DATA);
    // }
    
    this.Logger.info(JSON.stringify(CommandData));
    this.Socket.emit(this.Command.getOutgoingChannel(), CommandData);
  }


  private async validateIncomingData(): Promise<{ isValid: Boolean; errors?: any }> {
    if (this.Data == undefined) {
      return { isValid: true };
    }

    const incomingDataValidate = await this.ValidationService.compile(
      this.Command.getIncomingValidationSchema()
    );

    const isValid = await incomingDataValidate(this.Data);

    return { isValid, errors: incomingDataValidate.errors };
  }

  private sendErrorMessageToClient(errorMessage: StaticCommandErrorNames) {
    this.Socket.emit(this.Command.getOutgoingChannel(), {
      error: errorMessage,
    });
    this.Socket.emit(StaticCommandNames.NOTIFICATION, {
      type: NotificationTypes.ERROR,
      message: errorMessage,
    } as Notification);
  }

  private validateCommandUserAccessLevel(): Boolean {
    return this.Command.getUserAccessLevel() > this.Client.getAccessLevel();
  }

  private async executeCommand(): Promise<Object> {
    const ExecuteArguments: CommandExecuteArguments = {
      Client: this.Client,
      Data: this.Data,
      Database: this.Database,
    };

    return await this.CommandExecutionFunction(ExecuteArguments);
  }

  private validateOutgoingData(CommandData: any): Boolean {
    return this.ValidationService.validate(
      this.Command.getOutgoingValidationSchema(),
      CommandData
    );
  }

  private emitNotificationIfCommandRequires(CommandData: any) {
    if (CommandData?.notification) {
      this.Socket.emit(
        StaticCommandNames.NOTIFICATION,
        CommandData.notification as Notification
      );
      delete CommandData.notification;
    }
  }
}

export default CommandRouter;

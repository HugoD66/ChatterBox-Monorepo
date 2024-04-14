import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { UsersService } from '../users/users.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';

@Injectable()
export class MessageFixtures {
  constructor(
    private messageService: MessageService,
    private readonly usersService: UsersService,
  ) {}

  async seedMessages(): Promise<void> {
    const userList: ResponseUserDto[] = await this.usersService.findAll();

    const messages: CreateMessageDto[] = [
      {
        content: `Hello, how are you?`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `Hi, I'm fine, and you?`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `Hello, I'm fine too, thanks!`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `Wishing you a wonderful birthday filled with joy and laughter!`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `Could you please send me the file by tonight?`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `It was great seeing you at the event last night! Let’s plan to meet soon and discuss our collaboration further. Have a great day!`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `Hey, just wanted to tell you I really appreciated your help today.`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `Looking forward to our strategy session next week. Please prepare all the necessary documents and be ready to discuss the yearly targets.`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `Can we schedule a call to go over your feedback on my draft? Your critiques are always helpful, and I want to make sure this piece is perfect.`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `I appreciate your efforts in taking the lead on this project. Your leadership has been a driving force behind our recent successes.`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `As we approach the deadline, please ensure all team members have submitted their parts of the project. We cannot afford any delays at this stage.`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `Thank you for your help at the workshop yesterday. Your insights were invaluable, and I believe they will greatly enhance our strategy.`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `I finished reviewing the document you sent last week, and I have some ideas on how we can improve the project's efficiency. Let’s discuss.`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content: `Hey there! Just wanted to check in and see how you're doing. If you have some time this week, maybe we can grab a coffee and catch up.`,
        createdAt: new Date(),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
    ];
    for (const message of messages) {
      await this.messageService.create(message);
    }
  }
}

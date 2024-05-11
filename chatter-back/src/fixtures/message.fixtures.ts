import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { UsersService } from '../users/users.service';
import { RoomService } from '../room/room.service';
import { Room } from '../room/entities/room.entity';

@Injectable()
export class MessageFixtures {
  constructor(
    private messageService: MessageService,
    private roomService: RoomService,
    private readonly usersService: UsersService,
  ) {}

  async seedMessages(): Promise<void> {
    const userOwnerTest = await this.usersService.findOneByOptions({
      email: `dessauw.hugo@gmail.com`,
    });
    const privateParticipant = await this.usersService.findOneByOptions({
      email: `alice@example.com`,
    });
    const privateRoom: Room = await this.roomService.findOneByOptions({
      title: `Room private test 2`,
    });

    const messages: CreateMessageDto[] = [
      {
        content: `Hey Alice, as-tu déjà essayé de parler aux plantes ? Paraît que ça les fait pousser plus vite !`,
        createdAt: new Date(),
        sender: userOwnerTest,
        room: privateRoom,
        isRead: false,
      },
      {
        content: `Salut Hugo ! J'ai essayé, mais elles ne me répondent jamais. Peut-être que je devrais essayer en anglais ?`,
        createdAt: new Date(),
        sender: privateParticipant,
        room: privateRoom,
        isRead: false,
      },
      {
        content: `C'est une idée ! Et si ça ne marche pas, essaie avec l'allemand, elles trouveront peut-être le ton plus autoritaire.`,
        createdAt: new Date(),
        sender: userOwnerTest,
        room: privateRoom,
        isRead: false,
      },
      {
        content: `Bonne stratégie ! D'ailleurs, est-ce que tu penses qu'une plante pourrait apprendre le JavaScript ?`,
        createdAt: new Date(),
        sender: privateParticipant,
        room: privateRoom,
        isRead: false,
      },
      {
        content: `Pourquoi pas ? Après tout, avec Node.js, elles seraient déjà habituées à l'environnement !`,
        createdAt: new Date(),
        sender: userOwnerTest,
        room: privateRoom,
        isRead: false,
      },
      {
        content: `Imagine une plante codant mieux que nous... ce serait le comble !`,
        createdAt: new Date(),
        sender: privateParticipant,
        room: privateRoom,
        isRead: false,
      },
      {
        content: `Ça pourrait révolutionner le développement. Fini les bugs, bonjour les bugs de jardin !`,
        createdAt: new Date(),
        sender: userOwnerTest,
        room: privateRoom,
        isRead: false,
      },
      {
        content: `Exactement ! Elles pourraient même corriger nos erreurs de syntaxe en photosynthèse.`,
        createdAt: new Date(),
        sender: privateParticipant,
        room: privateRoom,
        isRead: false,
      },
      {
        content: `On ferait bien de leur laisser la main alors, peut-être qu'elles finiront par développer leur propre framework. Le PlantStrap !`,
        createdAt: new Date(),
        sender: userOwnerTest,
        room: privateRoom,
        isRead: false,
      },
      {
        content: `J'adore l'idée ! Je propose qu'on commence le brainstorming dès demain. Prêt pour une session de jardinage informatique ?`,
        createdAt: new Date(),
        sender: privateParticipant,
        room: privateRoom,
        isRead: false,
      },
    ];
    for (const message of messages) {
      await this.messageService.create(message);
    }
    /*{
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
      {
        content:
          'Salut, comment tu vas? As-tu essayé le nouveau café du coin?!',
        createdAt: new Date('2024-01-01T00:00:00'),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content:
          'Ah, ça sonne bien! Je suis curieux de goûter ça. Tu utilises quel type de café pour ta recette? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller?',
        createdAt: new Date('2024-01-01T08:30:00'),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content:
          "Pas mal. J'ai découvert un super café bio dernièrement, tu devrais tester.",
        createdAt: new Date('2024-01-03T08:30:00'),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content:
          "J'adore le café, surtout le matin. Ça me réveille vraiment! Tu bois quoi d'habitude?",
        createdAt: new Date('2024-01-04T08:30:00'),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content:
          'Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller?',
        createdAt: new Date('2024-01-04T08:30:00'),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content:
          "Absolument, j'ai une recette de café glacé incroyable. Idéale pour l'été!",
        createdAt: new Date('2024-01-02T08:30:00'),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content:
          'Ah, ça sonne bien! Je suis curieux de goûter ça. Tu utilises quel type de café pour ta recette? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller?',
        createdAt: new Date('2024-01-03T08:30:00'),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content:
          "Dernièrement, j'expérimente avec du café de Colombie. Ça a un goût assez unique, tu connais?",
        createdAt: new Date('2024-01-04T08:30:00'),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content:
          "Oui, j'aime beaucoup. D'ailleurs, j'organise une dégustation de café ce weekend, ça te dit de venir?",
        createdAt: new Date('2024-01-04T08:30:00'),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },
      {
        content:
          "C'est vraiment super, je passerai avec plaisir. Tu as une préférence pour le café?",
        createdAt: new Date('2024-01-04T08:30:00'),
        isRead: false,
        senderId: userList[Math.floor(Math.random() * userList.length)].id,
        receiverId: userList[Math.floor(Math.random() * userList.length)].id,
      },

  */
  }
}

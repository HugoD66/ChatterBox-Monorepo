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

  public getRandomDate(): Date {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const randomDate = new Date(
      yesterday.getTime() +
        Math.random() * (today.getTime() - yesterday.getTime()),
    );
    return randomDate;
  }

  async seedMessages(): Promise<void> {
    const userOwnerTest = await this.usersService.findOneByOptions({
      email: `dessauw.hugo@gmail.com`,
    });
    const privateParticipant = await this.usersService.findOneByOptions({
      email: `sender-test@email.com`,
    });
    const privateRoom: Room = await this.roomService.findOneByOptions({
      title: `Private room (Fixture generation) Hugo Dessauw and Sender Test`,
    });

    const messages: CreateMessageDto[] = [
      {
        content: `Hey Alice, as-tu déjà essayé de parler aux plantes ? Paraît que ça les fait pousser plus vite !`,
        createdAt: this.getRandomDate(),
        sender: userOwnerTest,
        roomId: privateRoom.id,
        isRead: false,
      },
      {
        content: `Salut Hugo ! J'ai essayé, mais elles ne me répondent jamais. Peut-être que je devrais essayer en anglais ?`,
        createdAt: this.getRandomDate(),
        sender: privateParticipant,
        roomId: privateRoom.id,
        isRead: false,
      },
      {
        content: `C'est une idée ! Et si ça ne marche pas, essaie avec l'allemand, elles trouveront peut-être le ton plus autoritaire.`,
        createdAt: this.getRandomDate(),
        sender: userOwnerTest,
        roomId: privateRoom.id,
        isRead: false,
      },
      {
        content: `Bonne stratégie ! D'ailleurs, est-ce que tu penses qu'une plante pourrait apprendre le JavaScript ?`,
        createdAt: this.getRandomDate(),
        sender: privateParticipant,
        roomId: privateRoom.id,
        isRead: false,
      },
      {
        content: `Pourquoi pas ? Après tout, avec Node.js, elles seraient déjà habituées à l'environnement !`,
        createdAt: this.getRandomDate(),
        sender: userOwnerTest,
        roomId: privateRoom.id,
        isRead: false,
      },
      {
        content: `Imagine une plante codant mieux que nous... ce serait le comble !`,
        createdAt: this.getRandomDate(),
        sender: privateParticipant,
        roomId: privateRoom.id,
        isRead: false,
      },
      {
        content: `Ça pourrait révolutionner le développement. Fini les bugs, bonjour les bugs de jardin !`,
        createdAt: this.getRandomDate(),
        sender: userOwnerTest,
        roomId: privateRoom.id,
        isRead: false,
      },
      {
        content: `Exactement ! Elles pourraient même corriger nos erreurs de syntaxe en photosynthèse.`,
        createdAt: this.getRandomDate(),
        sender: privateParticipant,
        roomId: privateRoom.id,
        isRead: false,
      },
      {
        content: `On ferait bien de leur laisser la main alors, peut-être qu'elles finiront par développer leur propre framework. Le PlantStrap !`,
        createdAt: this.getRandomDate(),
        sender: userOwnerTest,
        roomId: privateRoom.id,
        isRead: false,
      },
      {
        content: `J'adore l'idée ! Je propose qu'on commence le brainstorming dès demain. Prêt pour une session de jardinage informatique ?`,
        createdAt: this.getRandomDate(),
        sender: privateParticipant,
        roomId: privateRoom.id,
        isRead: false,
      },
    ];
    for (const message of messages) {
      await this.messageService.create(message);
    }
  }
}

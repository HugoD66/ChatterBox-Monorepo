import { Component, signal, WritableSignal } from '@angular/core';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { DiscussionComponent } from '../../components/blocs/discussion/discussion.component';
import { UserModel } from '../../models/user.model';
import { UserGeneralRoleEnum } from '../../enum/user.general.role.enum';
import { MessageModel } from '../../models/message.model';

@Component({
  selector: 'app-private-room',
  standalone: true,
  imports: [FriendProfilComponent, DiscussionComponent],
  templateUrl: './private-room.component.html',
  styleUrl: './private-room.component.scss',
})
export class PrivateRoomComponent {
  public friend: WritableSignal<UserModel> = signal({
    id: '1',
    pseudo: 'Alice',
    email: 'alice@example.com',
    picture: 'path/to/alice.jpg',
    createdAt: new Date('2024-01-01'),
    generalRoleEnum: UserGeneralRoleEnum.User,
  });
  public messages: WritableSignal<MessageModel[]> = signal([
    {
      id: '1',
      content: 'Salut, comment tu vas? As-tu essayé le nouveau café du coin?!',
      createdAt: new Date('2024-01-01T00:00:00'),
      senderId: '1',
      receiverId: '2',
    },
    {
      id: '2',
      content:
        'Ah, ça sonne bien! Je suis curieux de goûter ça. Tu utilises quel type de café pour ta recette? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller?',
      createdAt: new Date('2024-01-01T08:30:00'),
      senderId: '2',
      receiverId: '1',
    },
    {
      id: '3',
      content:
        "Pas mal. J'ai découvert un super café bio dernièrement, tu devrais tester.",
      createdAt: new Date('2024-01-03T08:30:00'),
      senderId: '1',
      receiverId: '2',
    },
    {
      id: '4',
      content:
        "J'adore le café, surtout le matin. Ça me réveille vraiment! Tu bois quoi d'habitude?",
      createdAt: new Date('2024-01-04T08:30:00'),
      senderId: '2',
      receiverId: '1',
    },
    {
      id: '5',
      content:
        'Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller?',
      createdAt: new Date('2024-01-04T08:30:00'),
      senderId: '1',
      receiverId: '2',
    },
    {
      id: '6',
      content:
        "Absolument, j'ai une recette de café glacé incroyable. Idéale pour l'été!",
      createdAt: new Date('2024-01-02T08:30:00'),
      senderId: '1',
      receiverId: '2',
    },
    {
      id: '7',
      content:
        'Ah, ça sonne bien! Je suis curieux de goûter ça. Tu utilises quel type de café pour ta recette? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller? Je suis plutôt latte macchiato, et parfois un bon cappuccino. Tu as une recette à me conseiller?',
      createdAt: new Date('2024-01-03T08:30:00'),
      senderId: '1',
      receiverId: '2',
    },
    {
      id: '8',
      content:
        "Dernièrement, j'expérimente avec du café de Colombie. Ça a un goût assez unique, tu connais?",
      createdAt: new Date('2024-01-04T08:30:00'),
      senderId: '2',
      receiverId: '1',
    },
    {
      id: '9',
      content:
        "Oui, j'aime beaucoup. D'ailleurs, j'organise une dégustation de café ce weekend, ça te dit de venir?",
      createdAt: new Date('2024-01-04T08:30:00'),
      senderId: '1',
      receiverId: '2',
    },
    {
      id: '10',
      content:
        "C'est vraiment super, je passerai avec plaisir. Tu as une préférence pour le café?",
      createdAt: new Date('2024-01-04T08:30:00'),
      senderId: '2',
      receiverId: '1',
    },
  ]);
}

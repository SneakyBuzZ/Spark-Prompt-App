export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  password: string;
  name: string;
}

export interface UserResetPassword {
  email: string;
}

export interface CreatePrompt {
  content: string;
}

export interface EditPrompt {
  content: string;
  promptId: string;
}

export interface GetAllPrompt {
  user: {
    name: string | null;
    image: string | null;
  };
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
}

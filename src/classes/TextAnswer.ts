interface TextAnswer {
  text: string;
  questionId: number;
}

class TextAnswer {
  static answer = (data: TextAnswer) => {
    // TODO smid op til databasen
  };
}

export default TextAnswer;

interface TextAnswer {
  text: string;
  questionId: string;
}

class TextAnswer {
  static answer = (data: TextAnswer) => {
    // TODO smid op til databasen
  };
}

export default TextAnswer;

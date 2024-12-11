import SentimentRepository from "../repositories/sentimentRepository";

class SentimentService {
    private sentimentRepository: SentimentRepository;

    constructor(sentimentRepository: SentimentRepository) {
        this.sentimentRepository = sentimentRepository;
    };

    async findAllMovieNotes(movieId: string) {
        return await this.sentimentRepository.findAllMovieNotes(movieId)
    };
}

export default SentimentService;
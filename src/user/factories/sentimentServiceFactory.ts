import SentimentRepository from "../repositories/sentimentRepository";
import SentimentService from "../services/sentimentService";

class SentimentServiceFactory {
    static create() {
        const sentimentRepository = new SentimentRepository();
        return new SentimentService(sentimentRepository);
    }
}

export default SentimentServiceFactory;
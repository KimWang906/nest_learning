import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    // eslint-disable-next-line prettier/prettier
    const movie = this.movies.find(movie => movie.id === +id);
    if (!movie) {
      // 에러 출력
      throw new NotFoundException(`Movie with ID: ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: string) {
    this.getOne(id); // 검사를 진행합니다.
    // eslint-disable-next-line prettier/prettier
    this.movies = this.movies.filter(movie => movie.id !== +id);
    return true;
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({
      ...movie,
      ...updateData, // 전개 연산자(...)을 이용해 데이터를 나열하여 반환합니다.
    });
  }
}

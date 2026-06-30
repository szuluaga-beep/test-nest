import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = this.eventRepository.create(createEventDto);
    await this.eventRepository.save(event);
    return event;
  }

  async findAll() {
    return await this.eventRepository.find();
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOneBy({
      id,
    });

    if (!event) throw new NotFoundException(`Not Found event with id ${id}`);

    return event;
  }

  update(id: number, updateEventDto: UpdateEventDto) {}

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}

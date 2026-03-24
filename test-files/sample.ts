/**
 * TypeScript Test File
 * Tests syntax highlighting for TS-specific tokens
 */

import type { ReactNode } from 'react';

// Type definitions
type Status = 'pending' | 'active' | 'completed' | 'failed';
type UserId = string | number;

// Interface
interface User {
  readonly id: UserId;
  name: string;
  email: string;
  status: Status;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

// Generic interface
interface Repository<T extends { id: UserId }> {
  findById(id: UserId): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: Omit<T, 'id'>): Promise<T>;
  delete(id: UserId): Promise<boolean>;
}

// Enum
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

// Generic class with constraints
class BaseRepository<T extends { id: UserId }> implements Repository<T> {
  protected items: Map<UserId, T> = new Map();

  async findById(id: UserId): Promise<T | null> {
    return this.items.get(id) ?? null;
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.items.values());
  }

  async save(entity: Omit<T, 'id'>): Promise<T> {
    const id = crypto.randomUUID();
    const item = { ...entity, id } as T;
    this.items.set(id, item);
    return item;
  }

  async delete(id: UserId): Promise<boolean> {
    return this.items.delete(id);
  }
}

// Utility types
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
type ReadonlyUser = Readonly<User>;
type UserKeys = keyof User;
type UserName = Pick<User, 'name' | 'email'>;

// Conditional types
type IsString<T> = T extends string ? true : false;
type Unwrap<T> = T extends Promise<infer U> ? U : T;

// Function overloads
function process(input: string): string;
function process(input: number): number;
function process(input: string | number): string | number {
  if (typeof input === 'string') {
    return input.toUpperCase();
  }
  return input * 2;
}

// Decorators (experimental)
function logged(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

// React component with TypeScript
interface Props {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<Props> = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Type guards
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}

// Namespace
namespace Validation {
  export function isEmail(value: string): boolean {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  }
}

export { User, Repository, LogLevel, Button };

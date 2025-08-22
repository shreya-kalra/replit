import {
  users,
  addresses,
  paymentMethods,
  userSettings,
  type User,
  type UpsertUser,
  type Address,
  type InsertAddress,
  type PaymentMethod,
  type InsertPaymentMethod,
  type UserSettings,
  type InsertUserSettings,
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Address operations
  getUserAddresses(userId: string): Promise<Address[]>;
  createAddress(address: InsertAddress): Promise<Address>;
  updateAddress(id: string, address: Partial<InsertAddress>): Promise<Address>;
  deleteAddress(id: string, userId: string): Promise<void>;
  setDefaultAddress(id: string, userId: string): Promise<void>;
  
  // Payment method operations
  getUserPaymentMethods(userId: string): Promise<PaymentMethod[]>;
  createPaymentMethod(paymentMethod: InsertPaymentMethod): Promise<PaymentMethod>;
  updatePaymentMethod(id: string, paymentMethod: Partial<InsertPaymentMethod>): Promise<PaymentMethod>;
  deletePaymentMethod(id: string, userId: string): Promise<void>;
  setDefaultPaymentMethod(id: string, userId: string): Promise<void>;
  
  // User settings operations
  getUserSettings(userId: string): Promise<UserSettings | undefined>;
  upsertUserSettings(settings: InsertUserSettings): Promise<UserSettings>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Address operations
  async getUserAddresses(userId: string): Promise<Address[]> {
    return await db.select().from(addresses).where(eq(addresses.userId, userId));
  }

  async createAddress(address: InsertAddress): Promise<Address> {
    const [newAddress] = await db.insert(addresses).values(address).returning();
    return newAddress;
  }

  async updateAddress(id: string, addressUpdate: Partial<InsertAddress>): Promise<Address> {
    const [updatedAddress] = await db
      .update(addresses)
      .set({ ...addressUpdate, updatedAt: new Date() })
      .where(eq(addresses.id, id))
      .returning();
    return updatedAddress;
  }

  async deleteAddress(id: string, userId: string): Promise<void> {
    await db.delete(addresses).where(and(eq(addresses.id, id), eq(addresses.userId, userId)));
  }

  async setDefaultAddress(id: string, userId: string): Promise<void> {
    // First, unset all default addresses for the user
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
    
    // Then set the specified address as default
    await db
      .update(addresses)
      .set({ isDefault: true })
      .where(and(eq(addresses.id, id), eq(addresses.userId, userId)));
  }

  // Payment method operations
  async getUserPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    return await db.select().from(paymentMethods).where(eq(paymentMethods.userId, userId));
  }

  async createPaymentMethod(paymentMethod: InsertPaymentMethod): Promise<PaymentMethod> {
    const [newPaymentMethod] = await db.insert(paymentMethods).values(paymentMethod).returning();
    return newPaymentMethod;
  }

  async updatePaymentMethod(id: string, paymentMethodUpdate: Partial<InsertPaymentMethod>): Promise<PaymentMethod> {
    const [updatedPaymentMethod] = await db
      .update(paymentMethods)
      .set({ ...paymentMethodUpdate, updatedAt: new Date() })
      .where(eq(paymentMethods.id, id))
      .returning();
    return updatedPaymentMethod;
  }

  async deletePaymentMethod(id: string, userId: string): Promise<void> {
    await db.delete(paymentMethods).where(and(eq(paymentMethods.id, id), eq(paymentMethods.userId, userId)));
  }

  async setDefaultPaymentMethod(id: string, userId: string): Promise<void> {
    // First, unset all default payment methods for the user
    await db
      .update(paymentMethods)
      .set({ isDefault: false })
      .where(eq(paymentMethods.userId, userId));
    
    // Then set the specified payment method as default
    await db
      .update(paymentMethods)
      .set({ isDefault: true })
      .where(and(eq(paymentMethods.id, id), eq(paymentMethods.userId, userId)));
  }

  // User settings operations
  async getUserSettings(userId: string): Promise<UserSettings | undefined> {
    const [settings] = await db.select().from(userSettings).where(eq(userSettings.userId, userId));
    return settings;
  }

  async upsertUserSettings(settings: InsertUserSettings): Promise<UserSettings> {
    const [upsertedSettings] = await db
      .insert(userSettings)
      .values(settings)
      .onConflictDoUpdate({
        target: userSettings.userId,
        set: {
          ...settings,
          updatedAt: new Date(),
        },
      })
      .returning();
    return upsertedSettings;
  }
}

export const storage = new DatabaseStorage();

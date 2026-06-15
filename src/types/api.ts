export type SubscriptionPlan = "STARTER" | "ENTERPRISE";
export type TenantStatus = "ACTIVE" | "SUSPENDED" | "CANCELLED";
export type MembershipStatus = "ACTIVE" | "EXPIRED" | "SUSPENDED";
export type AdminRole = "OWNER" | "MANAGER" | "STAFF";
export type InviteStatus = "PENDING" | "ACCEPTED" | "EXPIRED";
export type NotificationChannel = "PUSH" | "SMS" | "WHATSAPP";
export type MpesaStatus = "PENDING" | "SUCCESS" | "FAILED";
export type TransferReason = "RELOCATED" | "PRICE" | "PREFERENCE" | "OTHER";
export type TransferStatus = "PENDING" | "COMPLETED" | "REJECTED";
export type BookingStatus = "CONFIRMED" | "CANCELLED" | "ATTENDED";

export interface Tenant {
  id: string;
  gymName: string;
  slug: string;
  joinCode: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  mpesaPaybill: string | null;
  mpesaTillNumber: string | null;
  location: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  googlePlaceId: string | null;
  neighborhood: string | null;
  description: string | null;
  subscriptionPlan: SubscriptionPlan;
  status: TenantStatus;
  createdAt: string;
}

export interface TenantWithCounts extends Tenant {
  _count: { members: number; admins: number };
}

export interface Member {
  id: string;
  tenantId: string;
  phone: string | null;
  email: string | null;
  preferredName: string;
  membershipStatus: MembershipStatus;
  onboardingCompleted: boolean;
  fitnessGoal: string | null;
  daysPerWeek: number | null;
  reminderTime: string | null;
  nutritionReminders: boolean;
  channel: NotificationChannel;
  lastSeenAt: string | null;
  createdAt: string;
}

export interface GymAdmin {
  id: string;
  tenantId: string;
  email: string;
  name: string;
  role: AdminRole;
  suspended: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface GymAdminInvite {
  id: string;
  tenantId: string;
  email: string;
  name: string;
  role: AdminRole;
  token: string;
  status: InviteStatus;
  expiresAt: string;
  createdAt: string;
  acceptedAt: string | null;
}

export interface GymClass {
  id: string;
  tenantId: string;
  name: string;
  trainerId: string | null;
  scheduledAt: string;
  durationMin: number;
  capacity: number;
}

export interface ClassBooking {
  id: string;
  classId: string;
  memberId: string;
  bookedAt: string;
  status: BookingStatus;
}

export interface MpesaTransaction {
  id: string;
  tenantId: string;
  memberId: string | null;
  amount: number;
  mpesaRef: string;
  phone: string;
  status: MpesaStatus;
  description: string | null;
  createdAt: string;
}

export interface GymBenchmark {
  id: string;
  tenantId: string;
  weekOf: string;
  retentionPct: number;
  avgSessionsPerMember: number;
  activeMembers: number;
  newMembers: number;
  churnedMembers: number;
}

export interface GymTransfer {
  id: string;
  memberId: string;
  fromTenantId: string;
  toTenantId: string;
  reason: TransferReason;
  requestedAt: string;
  completedAt: string | null;
  status: TransferStatus;
}

export interface AdminLoginResponse {
  token: string;
  admin: { id: string; name: string; email: string; role: AdminRole };
  tenant: { id: string; gymName: string; slug: string };
}

export interface PlatformLoginResponse {
  token: string;
  admin: { id: string; name: string; email: string };
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  classesThisWeek: number;
}

export interface AdminMember {
  id: string;
  email: string | null;
  phone: string | null;
  preferredName: string;
  membershipStatus: MembershipStatus;
  lastSeenAt: string | null;
  createdAt: string;
}

export interface TransferEntry {
  memberName: string;
  reason: TransferReason;
  date: string;
}

export interface TransferDashboard {
  inbound: TransferEntry[];
  outbound: TransferEntry[];
}

export interface GymSearchResult {
  name: string;
  slug: string;
  joinCode: string;
  logoUrl: string | null;
  primaryColor: string;
  location: string | null;
  neighborhood: string | null;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  activeMembers: number;
}

export interface GymNearby extends GymSearchResult {
  id: string;
  gymName: string;
  distanceMeters: number;
  distanceLabel: string;
}

export interface GymPublicProfile extends GymSearchResult {
  photos: string[];
  hours: string[];
  rating: number | null;
}

export interface ProvisionTenantResponse {
  tenant: Tenant;
  invite: { id: string; email: string; expiresAt: string };
  joinCode: string;
}

export interface ProvisionFullResponse {
  tenant: Tenant;
  admin: { id: string; email: string; name: string; role: AdminRole };
  joinCode: string;
}

export interface InviteVerifyResponse {
  valid: boolean;
  invite?: {
    email: string;
    name: string;
    role: AdminRole;
    gymName: string;
    slug: string;
  };
  error?: string;
}

export interface InviteAcceptResponse {
  message: string;
  admin: { id: string; email: string; name: string; role: AdminRole };
  loginUrl: string;
  slug: string;
}

export interface PlatformStats {
  totalGyms: number;
  activeGyms: number;
  suspendedGyms: number;
  totalMembers: number;
  mrr: number;
  newSignupsThisMonth: number;
}

export interface PlatformAlert {
  type: string;
  severity: string;
  message: string;
  tenantId?: string;
  createdAt: string;
}

export interface BillingSummary {
  mrr: number;
  totalCollected: number;
  pending: number;
  failed: number;
}

export interface PricingTier {
  name: string;
  price: string;
  priceNum: number;
  period: string;
  members: string;
  hot: boolean;
  enterprise: boolean;
  features: string[];
  chips: string[];
}

export interface ValidationError {
  error: string;
  issues: Array<{ path: string[]; message: string; code: string }>;
}

export interface ApiErrorResponse {
  error: string;
  statusCode?: number;
}

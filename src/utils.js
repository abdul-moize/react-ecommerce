const CONTENT_MANAGER_ROLES = ["CM", "SA"];

export function isContentManager(userRole) {
  return CONTENT_MANAGER_ROLES.some((role) => role === userRole);
}

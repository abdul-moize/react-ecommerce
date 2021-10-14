const CONTENT_MANAGER_ROLES = ["CM", "SA"];

export function isContentManager() {
  const current_user_role = localStorage.getItem("role");
  return CONTENT_MANAGER_ROLES.some((role) => role === current_user_role);
}

export function isContentManager() {
  const roles = ["CM", "SA"];
  return roles.some((value) => value === localStorage.getItem("role"));
}

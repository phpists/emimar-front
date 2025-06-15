export const Burger = ({ onToggleSidebar }) => {
  return (
    <div className="nk-menu-trigger d-xl-none ms-n1" onClick={onToggleSidebar}>
      <div
        href="#"
        className="nk-nav-toggle nk-quick-nav-icon"
        data-target="sidebarMenu"
      >
        <em className="icon ni ni-menu" />
      </div>
    </div>
  );
};

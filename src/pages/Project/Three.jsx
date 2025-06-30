import { useEffect, useRef } from "react";
import { FileThree } from "./FileThree";

export const Three = ({ data, selected, onSelect }) => {
  const isFirstRender = useRef(true);

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     setTimeout(() => window.JSLists?.createTree("f1combined"), 1000);
  //   }
  // }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      setTimeout(() => {
        window.JSLists?.createTree("f1combined");

        // 🔽 Хак: примусово задаємо шрифт всім вкладеним елементам
        const root = document.getElementById("f1combined");
        if (root) {
          root.querySelectorAll("*").forEach(el => {
            el.style.fontFamily = "'Roboto', sans-serif";
            el.style.fontWeight = "500";
          });
        }
      }, 1000);
    }
  }, []);

  return (
    <div
      className="nk-fmg-aside toggle-screen-lg"
      data-content="files-aside"
      data-toggle-overlay="true"
      data-toggle-body="true"
      data-toggle-screen="lg"
      data-simplebar="init"
    >
      <div className="simplebar-wrapper" style={{ margin: 0 }}>
        <div className="simplebar-height-auto-observer-wrapper">
          <div className="simplebar-height-auto-observer" />
        </div>
        <div className="simplebar-mask">
          <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
            <div
              className="simplebar-content-wrapper"
              tabIndex={0}
              role="region"
              aria-label="scrollable content"
              style={{ height: "100%", overflowY: "auto" }}
            >
              <div className="simplebar-content">
                <ul id="f1combined" className="jslists">
                  <FileThree
                    nodes={data ?? []}
                    selected={selected}
                    onSelect={onSelect}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="simplebar-placeholder"
          style={{ width: 219, height: 665 }}
        />
      </div>
      <div
        className="simplebar-track simplebar-horizontal"
        style={{ visibility: "hidden" }}
      >
        <div
          className="simplebar-scrollbar"
          style={{ width: 0, display: "none" }}
        />
      </div>
      <div
        className="simplebar-track simplebar-vertical"
        style={{ visibility: "hidden" }}
      >
        <div
          className="simplebar-scrollbar"
          style={{ height: 0, display: "none" }}
        />
      </div>
    </div>
  );
};

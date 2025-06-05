import { useEffect, useRef } from "react";

export const Three = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      window.JSLists?.createTree("f1combined");
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
              style={{ height: "100%", overflow: "hidden" }}
            >
              <div className="simplebar-content">
                <ul id="f1combined" className="jslists">
                  <li>
                    <h6>Folder 1</h6>
                    <ul>
                      <li>
                        <h6>Folder 2</h6>
                        <ul>
                          <li>
                            <div className="file">File 1</div>
                          </li>
                          <li>
                            <div className="file">File 2</div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h6>Folder 3</h6>
                        <ul>
                          <li>
                            <div className="file">File 1</div>
                          </li>
                          <li>
                            <div className="file">File 2</div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h6>Folder 4</h6>
                        <ul>
                          <li>
                            <div className="file">File 1</div>
                          </li>
                          <li>
                            <div className="file">File 2</div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
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

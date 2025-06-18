export const Arrow = ({ active, desc }) =>
    active ? (
        desc ? (
            <svg width="10" height="10" style={{ marginLeft: 4 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 21 6 15" />
            </svg>
        ) : (
            <svg width="10" height="10" style={{ marginLeft: 4 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 3 18 9" />
            </svg>
        )
    ) : null;

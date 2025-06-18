const [query, setQuery] = useState('');
const [sortField, setSortField] = useState('name');
const [users, setUsers] = useState([]);

const sortedUsers = users
  .filter(u => u.name.toLowerCase().includes(query))
  .sort((a, b) => a[sortField].localeCompare(b[sortField]));

const [query, setQuery] = useState('');
const [sortField, setSortField] = useState('name');

const filteredGroups = groups
  .filter(group => group.name.toLowerCase().includes(query))
  .sort((a, b) => a[sortField].localeCompare(b[sortField]));

return (
  <>
    <input placeholder="Пошук груп" onChange={e => setQuery(e.target.value.toLowerCase())} />
    <table>
      <thead>
        <tr>
          <th onClick={() => setSortField('name')}>Name</th>
        </tr>
      </thead>
      <tbody>
        {filteredGroups.map(g => (
          <tr key={g.id}>
            <td>{g.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

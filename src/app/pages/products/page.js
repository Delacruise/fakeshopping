import Filter from '../../components/filter'
import SearchBar from '../../components/SearchBar';
import Categories from '../../components/productCategories';

export default function Products() {
  return (
    <div className='pageContainer flex gap-4'>
      <div className='leftCol '>
        <div className='containerBlocks'>
          <Filter />
        </div>
        <div className='containerBlocks'>
          <Categories />
        </div>
      </div>
      <div className='rightCol'>
        <div className='containerBlocks'>
          <SearchBar />
        </div>
        <div className='containerBlocks'>
          <div className='blockTitle'>Results</div>
          <div className='no__Results'>
            No results fond for search query: " "
          </div>
          <div className='results__Found'>
            Show results
          </div>
        </div>
      </div>
    </div>
  );
}

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ItemSkeleton = ({ cards }: { cards: number }) => {
  return Array(cards)
  .fill(0)
  .map((item, i) => (
    <div key={i} className="aspect-[5/6]">
        <SkeletonTheme
            baseColor="#323333ff"
            highlightColor="#555555ff"
            borderRadius="0.5rem"
            duration={1}
        ><div className="top-col">
            <Skeleton height={300} />
        </div>
        <div className="bottom-col">
            <Skeleton count={1} height={40} style={{ marginTop: "1rem" }}/>
        </div></SkeletonTheme>
        
    </div>
  ));
}

export default ItemSkeleton;
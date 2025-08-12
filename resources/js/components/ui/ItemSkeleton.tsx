import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ItemSkeleton = ({ cards }: { cards: number }) => {
  return Array(cards)
  .fill(0)
  .map((item, i) => (
    <div key={i} className="">
        <SkeletonTheme
            baseColor="#595959ff"
            highlightColor="#a8a8a8ff"
            borderRadius="0.5rem"
            duration={1}
        ><div className="top-col">
            <Skeleton height={250} />
        </div>
        <div className="bottom-col">
            <Skeleton count={1} height={60} style={{ marginTop: "1rem" }}/>
        </div></SkeletonTheme>
        
    </div>
  ));
}

export default ItemSkeleton;
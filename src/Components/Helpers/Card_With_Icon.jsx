

export default function Card_With_Icon(props){

const {icon, title, value, percentage, percentageColor,textForPercentage,colorBackIcon} = props;

    return (
        <div class="card shadow bg-transparent">
        <div class="card-header bg-transparent p-3 pt-2">
          <div class={"icon icon-lg icon-shape align-items-center d-flex justify-content-center  text-center rounded-2 mt-n4 position-absolute bg-gradient-"+colorBackIcon+" shadow-"
        +colorBackIcon}>
          {icon}
          </div>
          <div class="text-end pt-1">
            <p class="text-sm mb-0 text-capitalize">{title}</p>
            <h4 class="mb-0">{value}</h4>
          </div>
        </div>
       
        <div class="card-footer bg-transparent border-none p-3">
          <p class="mb-0"><span class={"text-sm font-weight-bolder text-"+percentageColor}>{percentage}</span>
          {textForPercentage}</p>
        </div>
      </div>
    )
}
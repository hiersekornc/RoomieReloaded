import * as React from 'react';
import { DefaultButton, CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import './navigation.css';
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker';
import moment from 'moment';
import { CalendarType } from '../../reducers/calendarReducer';
import { VoidCreator, AnyValueCreator } from '../../actions/actions';

export interface INavigationStateProps{
    currentTimeFrameText:string;
    currentTimeFrame:moment.Moment,
    activeCalendar:CalendarType;
}

export interface INavigationDispatchProps{
    onMonthClick:VoidCreator,
    onWeekClick:VoidCreator,
    onDayClick:VoidCreator,
    onNextTimeFrameClick:VoidCreator,
    onPreviousTimeFrameClick:VoidCreator,
    onTodayClick:VoidCreator,
    onTimeFrameSelected:AnyValueCreator;
}

type NavigationProps = INavigationStateProps & INavigationDispatchProps;

class NavigationView extends React.Component<NavigationProps> {

    render(){
        const{
            onMonthClick,
            onWeekClick,
            onDayClick,
            onNextTimeFrameClick,
            onPreviousTimeFrameClick,
            onTodayClick,
            onTimeFrameSelected,
            currentTimeFrameText,
            currentTimeFrame,
            activeCalendar
        } = this.props;

        return (
            <div className="navigation" >
                <div className="timeFrameNavigation" >
                    <CommandBarButton onClick={() => onPreviousTimeFrameClick()}
                        className="timeFrameNavigation-button previous"
                        iconProps={{iconName:'ChevronLeftSmall'}} />
                    <div className="timeFrameNavigation-text">
                        {currentTimeFrameText}
                    </div>
                    <CommandBarButton onClick={() => onNextTimeFrameClick()}
                        className="timeFrameNavigation-button next"
                        iconProps={{iconName:'ChevronRightSmall'}} />
                    <CommandBarButton onClick={() => onTodayClick()}
                        className="timeFrameNavigation-button today"
                        iconProps={{iconName:'GotoToday'}} />
                    <DatePicker 
                        className="timeFrameNavigation-button date"
                        showWeekNumbers={true}
                        showMonthPickerAsOverlay={true}
                        firstDayOfWeek={DayOfWeek.Monday}
                        formatDate={this.formatDate}
                        onSelectDate={(date?:Date | null) => this.onSelectDate(date, onTimeFrameSelected)}
                        value={currentTimeFrame.toDate()}
                        allowTextInput={false}
                    />
                </div>
                
                <div className="boardNavigation">
                    <DefaultButton onClick={() => onMonthClick()} className={this.getButtonClassName("MONTH", activeCalendar)} >
                        Monat
                    </DefaultButton>
                    <DefaultButton onClick={() => onWeekClick()} className={this.getButtonClassName("WEEK", activeCalendar)} >
                        Woche
                    </DefaultButton>
                    <DefaultButton onClick={() => onDayClick()} className={this.getButtonClassName("DAY", activeCalendar)} >
                        Tag
                    </DefaultButton>
                </div>
            </div>
        )
    }

    private getButtonClassName(buttonCalendar:CalendarType, activeCalendar:CalendarType) : string {
        const defaultClass = "boardNavigation-button";
        const activeBoardClassName = buttonCalendar === activeCalendar ? " boardNavigation-button-activated" : "";
    
        const buttonClass = `${defaultClass} ${buttonCalendar.toLowerCase()}${activeBoardClassName}`;
    
        return buttonClass;
    }
    
    private formatDate(date?:Date):string{
        if(date === undefined){
            return "";
        }
        const selectedDate = moment(date);
        return selectedDate.format("DD.MM.YYYY");
    }
    
    private onSelectDate(date:Date | undefined | null, updateFunc:AnyValueCreator){
        if(date === null || date === undefined){
            return;
        }
        const selectedDate = moment(date);
        updateFunc(selectedDate);
    }
}

export default NavigationView;
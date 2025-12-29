import {Switch,Route,useLocation} from 'react-router-dom'
import {TransitionGroup,CSSTransition} from "react-transition-group";

//main
import Dashbord from '../../views/dashboard/backend/main/dashbord'
import Rating from '../../views/dashboard/backend/main/rating';
import Comment from '../../views/dashboard/backend/main/comment';
import User from '../../views/dashboard/backend/main/user';
import Pricing from '../../views/dashboard/backend/main/pricing';

//App
import UserProfile from '../../views/dashboard/backend/app/usermanagement/userprofile'
import UserPrivacySetting from '../../views/dashboard/backend/app/usermanagement/userprivacysetting'
import UserAccountSettingList from '../../views/dashboard/backend/app/usermanagement/useraccountsetting'
import UserProfileEdit from '../../views/dashboard/backend/app/usermanagement/userprofileedit'

//Form
import Checkbox from '../../views/dashboard/backend/forms/formcontrols/checkbox'
import Elements from '../../views/dashboard/backend/forms/formcontrols/elements'
import Radio from '../../views/dashboard/backend/forms/formcontrols/radio'
import FromSwitch from '../../views/dashboard/backend/forms/formcontrols/switch'
import Validations from '../../views/dashboard/backend/forms/formcontrols/validations'
import Invoiceview from '../../views/dashboard/backend/pages/invoiceview';


//Extrapages
import Timeline1 from '../../views/dashboard/backend/pages/timeline/timeline1'
import Invoice   from '../../views/dashboard/backend/pages/invoice'
import FAQ       from '../../views/dashboard/backend/pages/faq'
import BlankPage from '../../views/dashboard/backend/pages/blankpage'
import TermsOfUse from '../../views/dashboard/backend/pages/extrapages/termsOfUse'
import PrivacyPolicy from  '../../views/dashboard/backend/pages/extrapages/privacyPolicy'

//Table
import  BasicTable from '../../views/dashboard/backend/table/basictable'
import  DataTable  from '../../views/dashboard/backend/table/datatable'
import  EditTable from '../../views/dashboard/backend/table/edittable'

//ui
import UiAlerts from '../../views/dashboard/backend/ui/UiAlerts'
import UiBadges from '../../views/dashboard/backend/ui/UiBadges'
import UiBreadcrumbs  from '../../views/dashboard/backend/ui/UiBreadcrumbs'
import UiButtons from '../../views/dashboard/backend/ui/UiButtons'
import UiCards from '../../views/dashboard/backend/ui/UiCards'
import UiCarousels from '../../views/dashboard/backend/ui/UiCarousels'
import UiColors from '../../views/dashboard/backend/ui/UiColors'
import UiEmbed from '../../views/dashboard/backend/ui/UiEmbed'
import UiGrids from '../../views/dashboard/backend/ui/UiGrids'
import UiImages from '../../views/dashboard/backend/ui/UiImages'
import UiListGroups from '../../views/dashboard/backend/ui/UiListGroups'
import UiMediaObjects from '../../views/dashboard/backend/ui/UiMediaObjects'
import UiModals from '../../views/dashboard/backend/ui/UiModals'
import UiNotifications from '../../views/dashboard/backend/ui/UiNotifications'
import UiPaginations from '../../views/dashboard/backend/ui/UiPaginations'
import UiPopOvers from '../../views/dashboard/backend/ui/UiPopOvers'
import UiProgressBars from  '../../views/dashboard/backend/ui/UiProgressBars'
import UiTabs from '../../views/dashboard/backend/ui/UiTabs'
import UiTooltips from '../../views/dashboard/backend/ui/UiTooltips'
import UiTypography from '../../views/dashboard/backend/ui/UiTypography'

// icon-heroicon
import Heroicons from '../../views/dashboard/backend/Icons/Heroicons ';
import Dripicons from '../../views/dashboard/backend/Icons/dripicons';
import FontAwsome from '../../views/dashboard/backend/Icons/fontawsome';
import LineAwsome from '../../views/dashboard/backend/Icons/lineawsome';
import Remixicons from '../../views/dashboard/backend/Icons/remixicons';
import Unicons from '../../views/dashboard/backend/Icons/unicons'

//Category
//import AddCategory from '../../views/dashboard/backend/category/add-category';
//import CategoryList from '../../views/dashboard/backend/category/category-list';

//Acteur
import AddActeur from '../../views/dashboard/backend/acteur/add-acteur';
import EditActeur from '../../views/dashboard/backend/acteur/edit-acteur'
import ActeurList from '../../views/dashboard/backend/acteur/acteur-list';

//Orateur
import AddOrateur from '../../views/dashboard/backend/orateur/add-orateur';
import EditOrateur from '../../views/dashboard/backend/orateur/edit-orateur'
import OrateurList from '../../views/dashboard/backend/orateur/orateur-list';

//Media
import AddMovie from '../../views/dashboard/backend/media/add-media';
import MovieList from '../../views/dashboard/backend/media/media-list';

//Show
import AddShow from '../../views/dashboard/backend/show/add-show';
import ShowList from '../../views/dashboard/backend/show/show-list';

//form-wizard
import SimpleWizard from '../../views/dashboard/backend/form-wizard/simple-wizard';
import ValidateWizard from '../../views/dashboard/backend/form-wizard/validate-wizard';
import VerticalWizard from '../../views/dashboard/backend/form-wizard/vertical-wizard';


//Eglise
import AddEglise from '../../views/dashboard/backend/eglise/add-eglise';
import EditEglise from '../../views/dashboard/backend/eglise/edit-eglise'
import EgliseList from '../../views/dashboard/backend/eglise/eglise-list';


//Categorie
import AddCategory from '../../views/dashboard/backend/category/add-category';
import EditCategory from '../../views/dashboard/backend/category/edit-category'
import CategoryList from '../../views/dashboard/backend/category/category-list';


//Langue
import AddLangue from '../../views/dashboard/backend/langue/add-langue';
import EditLangue from '../../views/dashboard/backend/langue/edit-langue'
import LangueList from '../../views/dashboard/backend/langue/langue-list';


//Type media
import AddTypeMedia from '../../views/dashboard/backend/type-media/add-type-media';
import EditTypeMedia from '../../views/dashboard/backend/type-media/edit-type-media'
import TypeMediaList from '../../views/dashboard/backend/type-media/type-media-list';


//Media
import AddMedia from '../../views/dashboard/backend/media/add-media';
import EditMedia from '../../views/dashboard/backend/media/edit-media'
import MediaList from '../../views/dashboard/backend/media/media-list';


const Layout1Route = () => {

    let location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
            >
                <Switch  location={location}>
                    <Route path="/dashboard" exact component={Dashbord} />
                    <Route path="/dashboard/rating" exact component={Rating} />
                    <Route path="/dashboard/comment" exact component={Comment} />
                    <Route path="/dashboard/user" exact component={User} />
                    <Route path="/dashboard/pages-pricing" exact component={Pricing} />

                    {/* App */}
                    <Route path="/dashboard/user-profile"         component={UserProfile} />
                    <Route path="/dashboard/user-privacy-setting" component={UserPrivacySetting} />
                    <Route path="/dashboard/user-account-setting" component={UserAccountSettingList} />
                    <Route path="/dashboard/user-profile-edit"    component={UserProfileEdit} />

                    {/* Form  */}
                    <Route path="/dashboard/form-chechbox"      component={Checkbox} />
                    <Route path="/dashboard/form-layout"        component={Elements} />
                    <Route path="/dashboard/form-radio"         component={Radio} />
                    <Route path="/dashboard/form-switch"        component={FromSwitch} />
                    <Route path="/dashboard/form-validation"    component={Validations} />
                  

                    {/* Icon */}
                    <Route path="/dashboard/icon-heroicon" component={Heroicons}/>
                    <Route path="/dashboard/icon-dripicons" component={Dripicons}/>
                    <Route path="/dashboard/icon-fontawesome-5" component={FontAwsome}/>
                    <Route path="/dashboard/icon-lineawesome" component={LineAwsome}/>
                    <Route path="/dashboard/icon-remixicon" component={Remixicons}/>
                    <Route path="/dashboard/icon-unicons" component={Unicons}/>

                    {/* Extrapages */}
                    <Route path="/dashboard/pages-timeline"       component={Timeline1} />
                    <Route path="/dashboard/pages-invoice"    component={Invoice} />
                    <Route path="/dashboard/pages-faq"        component={FAQ} />
                    <Route path="/dashboard/blank-page" component={BlankPage} />
                    <Route path="/dashboard/terms-of-service" component={TermsOfUse} />
                    <Route path="/dashboard/privacy-policy"   component={PrivacyPolicy} />
                    <Route path="/dashboard/invoice-view"     component={Invoiceview}/>

                    {/* Table */}
                    <Route path="/dashboard/tables-basic"    component={BasicTable} />
                    <Route path="/dashboard/data-table"     component={DataTable} />
                    <Route path="/dashboard/table-editable" component={EditTable} />

                    {/* Ui */}
                    <Route path="/dashboard/ui-alerts"         component={UiAlerts}/>
                    <Route path="/dashboard/ui-badges"         component={UiBadges}/>
                    <Route path="/dashboard/ui-breadcrumb"     component={UiBreadcrumbs}/>
                    <Route path="/dashboard/ui-buttons"        component={UiButtons}/>
                    <Route path="/dashboard/ui-cards"          component={UiCards}/>
                    <Route path="/dashboard/ui-carousel"       component={UiCarousels}/>
                    <Route path="/dashboard/ui-colors"         component={UiColors}/>
                    <Route path="/dashboard/ui-embed-video"    component={UiEmbed}/>
                    <Route path="/dashboard/ui-grid"           component={UiGrids}/>
                    <Route path="/dashboard/ui-images"         component={UiImages}/>
                    <Route path="/dashboard/ui-list-group"     component={UiListGroups}/>
                    <Route path="/dashboard/ui-media-object"   component={UiMediaObjects}/>
                    <Route path="/dashboard/ui-modal"          component={UiModals}/>
                    <Route path="/dashboard/ui-notifications"  component={UiNotifications}/>
                    <Route path="/dashboard/ui-pagination"     component={UiPaginations}/>
                    <Route path="/dashboard/ui-popovers"       component={UiPopOvers}/>
                    <Route path="/dashboard/ui-progressbars"   component={UiProgressBars}/>
                    <Route path="/dashboard/ui-tabs"           component={UiTabs}/>
                    <Route path="/dashboard/ui-tooltips"       component={UiTooltips}/>
                    <Route path="/dashboard/ui-typography"     component={UiTypography}/>

                    {/* Category */}
                    {/*<Route path="/dashboard/add-category"       component={AddCategory}/>*/}
                    {/*<Route path="/dashboard/category-list" component={CategoryList} />*/}

                    {/* Acteur */}
                    <Route path="/dashboard/add-acteur" component={AddActeur} />
                    <Route path="/dashboard/edit-acteur" component={EditActeur} />
                    <Route path="/dashboard/acteur-list" component={ActeurList} />

                    {/* Orateur */}
                    <Route path="/dashboard/add-orateur" component={AddOrateur} />
                    <Route path="/dashboard/edit-orateur" component={EditOrateur} />
                    <Route path="/dashboard/orateur-list" component={OrateurList} />

                    {/* Eglise */}
                    <Route path="/dashboard/add-eglise" component={AddEglise} />
                    <Route path="/dashboard/edit-eglise" component={EditEglise} />
                    <Route path="/dashboard/eglise-list" component={EgliseList} />

                    {/* Categorie */}
                    <Route path="/dashboard/add-category" component={AddCategory} />
                    <Route path="/dashboard/edit-category" component={EditCategory} />
                    <Route path="/dashboard/category-list" component={CategoryList} />

                    {/* Langue */}
                    <Route path="/dashboard/add-langue" component={AddLangue} />
                    <Route path="/dashboard/edit-langue" component={EditLangue} />
                    <Route path="/dashboard/langue-list" component={LangueList} />

                    {/* Type media */}
                    <Route path="/dashboard/add-type-media" component={AddTypeMedia} />
                    <Route path="/dashboard/edit-type-media" component={EditTypeMedia} />
                    <Route path="/dashboard/type-media-list" component={TypeMediaList} />
                    
                    {/* Media */}
                    <Route path="/dashboard/add-media" component={AddMedia} />
                    <Route path="/dashboard/edit-media" component={EditMedia} />
                    <Route path="/dashboard/media-list"component={MediaList}/>

                    {/* Movie */}
                    <Route path="/dashboard/add-movie" component={AddMovie} />
                    <Route path="/dashboard/movie-list" component={MovieList} />


                    {/* Show */}
                    <Route path="/dashboard/add-show"        component={AddShow}/>
                    <Route path="/dashboard/show-list"       component={ShowList}/>

                    {/* Form-wizard */}
                    <Route path="/dashboard/form-wizard"      component={SimpleWizard}/>
                    <Route path="/dashboard/form-wizard-validate"    component={ValidateWizard}/>
                    <Route path="/dashboard/form-wizard-vertical"    component={VerticalWizard}/>

                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default Layout1Route
import React, {useState} from 'react'

import { AppBar, Container, Typography, Button, Divider } from '@material-ui/core'

import Animal_bone from './BIO/Animal_bone.jpg'
import Animal_dung from './BIO/Animal_dung.jpg'
import biodegradable_waste from './BIO/biodegradable_waste.gif'
import egg_shell from './BIO/egg_shell.jpg'
import Flowers from './BIO/Flowers.jpg'
import Fruits_and_vegetables_skin from './BIO/Fruits_and_vegetables_skin.jpg'
import Grass from './BIO/Grass.jpg'
import Intestines_and_fish_scales from './BIO/Intestines_and_fish_scales.jpg'
import Leaves from './BIO/Leaves.jpg'
import Leftover_food from './BIO/Leftover_food.jpg'
import vegetable_seed from './BIO/vegetable_seed.jpg'
import Vegetables from './BIO/Vegetables.jpeg'

import Aluminum_cans from './RECYLABLE/Aluminum_cans.jpg'
import Candy_wrapper from './RECYLABLE/Candy_wrapper.png'
import Glass_jars_and_bottles from './RECYLABLE/Glass_jars_and_bottles.png'
import Juice_Packs from './RECYLABLE/Juice_Packs.jpg'
import Paper_and_carton from './RECYLABLE/Paper_and_carton.png'
import PET_bottles from './RECYLABLE/PET_bottles.jpg'
import Plastic_containers from './RECYLABLE/Plastic_containers.jpg'
import Plastic_caps from './RECYLABLE/Plastic_caps.jpg'
import Straws from './RECYLABLE/Straws.jpg'
import recyclable_waste from './RECYLABLE/recyclable_waste.jpg'

import ceramics from './NONBIO/ceramics.jpg'
import diapers from './NONBIO/diapers.jpg'
import Non_biodegradable from './NONBIO/Non_biodegradable.jpg'
import sanitary_napkins from './NONBIO/sanitary_napkins.jpg'
import Styropor from './NONBIO/Styropor.jpg'

const WasteTypes = () => {
    const [byBioVariant, setBioVariant] = useState('outlined')
    const [byNonBioVariant, setNonBioVariant] = useState('text')
    const [byRecyclableVariant, setRecyclableVariant] = useState('text')

    const handleByBiodegradable = () => {
        setBioVariant("outlined")
        setNonBioVariant("text")
        setRecyclableVariant("text")
    }
    const handleByNonBiodegradable = () => {
        setBioVariant("text")
        setNonBioVariant("outlined")
        setRecyclableVariant("text")
    }
    const handleByRecyclable = () => {
        setBioVariant("text")
        setNonBioVariant("text")
        setRecyclableVariant("outlined")
    }

    return (
        <div className='container'>
            <section className="page-section mt-5">
                <div className='mt-2 mb-5'>
                        <h3>Why is segregation important?</h3>
                        <p>Segregation at source is a crucial step to reduce the volume of waste for collection and disposal.</p>
                        <p>If not segregated, most solid wastes end up as “mixed garbage” and will add to the pile of garbage in landfills. </p>
                </div>
                


                <Button color="primary" variant={byBioVariant} onClick={handleByBiodegradable}>Biodegradable</Button>
                <Button color="primary" variant={byNonBioVariant} onClick={handleByNonBiodegradable}>non-Biodegradable</Button>
                <Button color="primary" variant={byRecyclableVariant} onClick={handleByRecyclable}>Recyclable</Button>
                
                <Divider style={{ margin: '10px 0' }} />
                
                {byBioVariant == "outlined"? <>
                    <h3>BIODEGRADABLE (NABUBULOK)</h3>
                    <p>Biodegradable waste is a type of garbage that may be decomposed by other living organisms. It mainly comes from plant or animal sources.</p>

                    <table className='table'>
                        <thead className='table-dark'>
                            <tr>
                                <th>Halimbawa</th>
                                <th>Litrato</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Vegetables/Gulay</th>
                                <th><img src={Vegetables} alt="vegetables" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Grass/Damo</th>
                                <th><img src={Grass} alt="Grass" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Leaves/Dahon</th>
                                <th><img src={Leaves} alt="Leaves" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Flowers/Bulaklak</th>
                                <th><img src={Flowers} alt="Flowers" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Fruits and vegetables skin/Balat ng prutas at Gulay </th>
                                <th><img src={Fruits_and_vegetables_skin} alt="Fruits_and_vegetables_skin" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Leftover food/ Tira-tirang pagkain</th>
                                <th><img src={Leftover_food} alt="Leftover_food" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Intestines, Fish scales /Bituka, Kalisikis ng isda at pinaglinisan ng karne</th>
                                <th><img src={Intestines_and_fish_scales} alt="Intestines_and_fish_scales" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Vegetable and Animal Seeds/Buto ng Gulay at Hayop</th>
                                <th><img src={vegetable_seed} alt="vegetable_seed" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Egg shell/Balat ng itlog</th>
                                <th><img src={egg_shell} alt="egg_shell" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Animal dung/Dumi ng hayop</th>
                                <th><img src={Animal_dung} alt="Animal_dung" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>And other perishable waste/At iba pang nabubulok na basura</th>
                                <th><img src={biodegradable_waste} alt="vegetables" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                        </tbody>
                    </table>
                </>:null}

                {byNonBioVariant == "outlined"? <>
                    <h3>NON-BIODEGRADABLE (DI-NABUBULOK)</h3>
                    <p>Non-biodegradable wastes are those that take a long time to break down or disintegrate. These are wastes that don't decompose into manure and pile up, polluting the environment. The combustion of these fuels pollutes the environment much more.</p>

                    <table className='table'>
                        <thead className='table-dark'>
                            <tr>
                                <th>Halimbawa</th>
                                <th>Litrato</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Diapers</th>
                                <th><img src={diapers} alt="diapers" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Seramics / Ceramics</th>
                                <th><img src={ceramics} alt="ceramics" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Styropor</th>
                                <th><img src={Styropor} alt="Styropor" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Sanitary napkins</th>
                                <th><img src={sanitary_napkins} alt=" " style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                        </tbody>
                    </table>
                </>:null}
                
                {byRecyclableVariant == "outlined"? <>
                    <h3>RECYCLABLE (NARERESIKLO)</h3>
                    <p>Recyclable waste that has been segregated from the waste stream and placed aside for recovery, reuse, or recycling.</p>

                    <table className='table'>
                        <thead className='table-dark'>
                            <tr>
                                <th>Halimbawa</th>
                                <th>Litrato</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>PET bottles/Boteng gawa sa plastic</th>
                                <th><img src={PET_bottles} alt="PET_bottles" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Paper and carton/Papel at karton</th>
                                <th><img src={Paper_and_carton} alt="Paper_and_carton" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Aluminum cans (example: Can of coca-cola)</th>
                                <th><img src={Aluminum_cans} alt="Aluminum_cans" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Plastic containers/ Plastik na lalagyanan</th>
                                <th><img src={Plastic_containers} alt="Plastic_containers" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Candy wrapper/ Balat ng candy o sitsirya</th>
                                <th><img src={Candy_wrapper} alt="Candy_wrapper" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Plastic caps</th>
                                <th><img src={Plastic_caps} alt="Plastic_caps" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Juice Packs (example: Zest-o)</th>
                                <th><img src={Juice_Packs} alt="Juice_Packs" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Straws</th>
                                <th><img src={Straws} alt="Straws" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                            <tr>
                                <th>Glass jars and bottles</th>
                                <th><img src={Glass_jars_and_bottles} alt="Glass_jars_and_bottles" style={{maxWidth:"20vw", minWidth: "200px"}}/></th>
                            </tr>
                        </tbody>
                    </table>
                </>:null}
            </section>
        </div>
    )
}

export default WasteTypes